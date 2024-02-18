#include<stdio.h>
int isPrime(int x)
{
    if(x<4)
    {
        return 1;
    }
    for(int i=2;i<=x/2;i++)
    {
        if(x%i == 0)
        {
            return 0;
        }
    }
    return 1;
}
int main() {
    int n,count=0,it=2;
    scanf("%d",&n);
    while((count<n))
    {
        if(isPrime(it))
        {
            printf("%d ",it);
            count++;
        }
        it++;
    }
}