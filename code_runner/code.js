class Code {
  static list = require("./settings.json");
  static fs = require("fs");
  constructor(
    code = "print('Hello World')", //default code
    lang = "py", //language
    args = "", //arguments
    fn = "test", //file name
    exe = "test" //executable file name
  ) {
    this._e = -1; //shows program executed or not
    this.code = code;
    this.lang = lang;
    this.args = args;
    this.exe = exe;
    this.fn = fn + "." + lang; //for platform independence
    this.interpreted_lang = this.lang_type();
  }

  lang_type() {
    const index = Object.keys(Code.list).indexOf(this.lang);

    if (index > Code.list["interpreted_till"])
      //interpreted languages are stored at the top
      return false;

    return true;
  }

  file_exists() {
    return Code.fs.existsSync(`${this.fn}`);
  }

  make_file() {
    Code.fs.writeFile(`${this.fn}`, this.code, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }

  delete_file() {
    Code.fs.unlinkSync(this.fn, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }

  run_cmd() {
    const { exec } = require("child_process");
    return new Promise((resolve, reject) => {
      const r = exec(this.run_com, (error, stdout, stderr) => {
        if (error) {
          this._error = stderr;
          this._output = stdout;
          this.error_flag = 1;
        } else {
          this._output = stdout;
          this._error = "No error";
        }
      });

      r.on("close", (code) => {
        this._e = 1;
        resolve(this);
      });
    });
  }

  del_runned_files() {
    const { exec } = require("child_process");
    exec(Code.list["del_" + this.lang]);
  }

  async run_file() {
    if (!this.file_exists()) this.make_file();

    this._output = "Execution pending";
    this._error = "Execution pending";

    if (this.interpreted_lang) {
      this.run_com = Code.replace(Code.list[this.lang], this.fn, this.args);
      await this.run_cmd();
      this.delete_file();
      return;
    }

    this.run_com = Code.replace(Code.list[this.lang], this.fn, this.exe);
    await this.run_cmd();
    this.delete_file();

    if (this.error_flag)
      //incase of compilation error
      return;

    this.run_com = Code.replace(
      Code.list["run_" + this.lang],
      this.exe,
      this.args
    );
    await this.run_cmd();
    this.del_runned_files();
  }

  get error() {
    if (this._e == -1) return this.run_file();
    return this._error;
  }

  get output() {
    if (this._e == -1) return this.run_file();
    return this._output;
  }

  static replace(
    s //replace {}
  ) {
    const arg = Object.values(arguments).slice(1); //convert obj to array removing s
    for (let i in arg) {
      s = s.replace("{}", arg[i]);
    }
    return s;
  }
}
module.exports.Code = Code;
