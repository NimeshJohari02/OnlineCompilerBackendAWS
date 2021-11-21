const code=require("../code_runner/code.js").Code;

const l=
`
puts("f4f");
`;
a = new code(l,"rb");
async function fun()
{
    const b=await a.run_file();
    // console.log(a);
    console.log(a.output);
    console.log(a.error)
}
fun();
