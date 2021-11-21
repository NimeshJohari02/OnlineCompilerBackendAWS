const code=require("../code_runner/code.js").Code;

const l=`
class A
{
    int a;
}
public class test
{
    public static void main(String args[])
    {
        System.out.println("dsf"+args[0]+args[1]+args[2]);
    }
}
`;
a = new code(l,"java","35 44 54");
async function fun()
{
    await a.run_file();
    console.log(a.output);
    console.log(a.error)
}
fun();
