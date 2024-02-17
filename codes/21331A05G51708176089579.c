#include<stdio.h>
int main(void){
int n;
scanf("%d",&n);
int a[n];
for(int i=0;i<n;i++){
scanf("%d",&a[i]);
}
int ans = 5;
for(int i=0;i<n;i++){
if(a[i] % 2 != 0 && a[i] > ans){
ans = a[i];
}
}
printf("%d",ans);
return 0;
}