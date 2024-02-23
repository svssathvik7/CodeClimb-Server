#include<stdio.h>

int main() {
    int n;
    scanf("%d",&n);
    int fact = 1;
    for(int i=1;i<=n;i++){
        if(i % 2 == 0){
            fact = fact * i;
        }
    }
    printf("%d",fact);
}