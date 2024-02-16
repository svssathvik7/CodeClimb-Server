const easy = [
    {
        qId : "qs1",
        question : `print("%d",5);`,
        ansId : "ans1"
    },
    {
        qId : "qs2",
        question : `printf("%d",*5);`,
        ansId : "ans2"
    },
    {
        qId : "qs3",
        question : `scanf("%d",#a);`,
        ansId : "ans3"
    },
    {
        qId : "qs4",
        question : `for(int i=0;i<5;i+)`,
        ansId : "ans4"
    },
    {
        qId : "qs5",
        question : `for(int i=0,i<5,i++)`,
        ansId : "ans5"
    },
    {
        qId : "qs6",
        question : `for(int i=0;i<5,i++)`,
        ansId : "ans5"
    },
    {
        qId : "qs6",
        question : `for(int i=0,i<5;i++)`,
        ansId : "ans6"
    },
    {
        qId : "qs7",
        question : `for(int i=0,i<5;i++)`,
        ansId : "ans7"
    },
    {
        qId : "qs8",
        question : `scanf("%[^n]",s);`,
        ansId : "ans8"
    },
    {
        qId : "qs9",
        question : `scanf("%[\n]",s);`,
        ansId : "ans9"
    },
    {
        qId : "qs10",
        question : `printf("%d",print("1 1"));`,
        ansId : "ans10"
    }
];
const hard = [
    {
        qId : "qh1",
        question : `Read an integer n and print the first n prime numbers :`,
        ansId : "./validators/vqh1.c",
        tcId : "./testcases/tcqh1.txt",
        bonus : 5
    },
    {
        qId : "qh2",
        question : `Read an integer n and print the first n fibinocci numbers :`,
        ansId : "./validators/vqh2.c",
        tcId : "./testcases/tcqh2.txt",
        bonus : 5
    },
    {
        qId : "qh3",
        question : `Read two integers m,n and print m^n result and print the result (double data type):`,
        ansId : "./validators/vqh3.c",
        tcId : "./testcases/tcqh3.txt",
        bonus : 5
    },
    {
        qId : "qh4",
        question : `Read an integer and print 1 if its an armstrong number and 0 if not`,
        ansId : "./validators/vqh4.c",
        tcId : "./testcases/tcqh4.txt",
        bonus : 7
    },
    {
        qId : "qh5",
        question : `Read an integer and determine its factorial by excluding all the odd numbers less than the given integer :`,
        ansId : "./validators/vqh5.c",
        tcId : "./testcases/tcqh5.txt",
        bonus : 5
    },
    {
        qId : "qh6",
        question : `First line of input has n(size of array) and the next line has array of size n. Determine the odd maximum element greater than 5`,
        ansId : "./validators/vqh6.c",
        tcId : "./testcases/tcqh6.txt",
        bonus : 5
    },
    {
        qId : "qh7",
        question : `Read an integer n(size of a square matrix) and the next line has n*n elements which are matrix elements. Now print the transpose of the matrix`,
        ansId : "./validators/vqh7.c",
        tcId : "./testcases/tcqh7.txt",
        bonus : 7
    },
]
module.exports = {easy,hard};