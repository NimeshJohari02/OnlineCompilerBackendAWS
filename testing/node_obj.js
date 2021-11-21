const code=require("../code_runner/code.js").Code;

const l=
`
console.log("f4f");
`;
a = new code(l,"js");
async function fun()
{
    const b=await a.run_file();
    // console.log(a);
    console.log(a.output);
    console.log(a.error)
}
fun();
