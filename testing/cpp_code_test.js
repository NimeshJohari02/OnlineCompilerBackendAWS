const code=require("../code_runner/code.js").Code;

const l=`
#include<iostream>
using namespace std;
main()
{
    cout<<"Cxexfr";
}
`;
a = new code(l,"cpp");
async function fun()
{
    await a.run_file();
    console.log(a.output);
    console.log(a.error)
}
fun();
