const code=require("../code_runner/code.js").Code;

const l=`
#include<stdio.h>
main()
{
    printf("Cxexfr");
}
`;
a = new code(l,"c");
async function fun()
{
    await a.run_file();
    console.log(a.output);
    console.log(a.error)
}
fun();
