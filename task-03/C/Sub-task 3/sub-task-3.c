#include<stdio.h>
void main() {
     int n;
     printf("Enter the value of n: ");
     scanf("%d",&n);

     for(int i=0;i<n;i++){
	for(int j=i;j<n;j++){
	    printf("  ");
	}
	for(int j=0;j<=i;j++){
            printf("* ");
        }
	for(int j=0;j<i;j++){
	    printf("* ");
       	}
	printf("\n");
     }
     for(int i=0;i<=n;i++){
       	for(int j=0;j<i;j++){
            printf("  ");
        }
        for(int j=i;j<n;j++){
            printf("* ");
        }
        for(int j=i;j<=n;j++){
            printf("* ");
        }
        printf("\n");
      }
}

