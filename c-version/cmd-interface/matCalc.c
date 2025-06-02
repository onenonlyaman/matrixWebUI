#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// global variables
int mat[100][100], i, j, rows = 0, cols = 0, choice, r1num, r2num, r2multiplier;
char operationType;

// bhai ye clear input buffer google kar lena.
void clear_input_buffer()
{
    int c;
    while ((c = getchar()) != '\n' && c != EOF)
        ;
}

void defineMatrix()
{
    printf("Enter number of rows: ");
    scanf("%d", &rows);
    clear_input_buffer();

    printf("Enter number of columns: ");
    scanf("%d", &cols);
    clear_input_buffer();

    printf("Enter elements of the matrix:\n");
    for (i = 0; i < rows; i++)
    {
        printf("Row %d: ", i + 1);
        for (j = 0; j < cols; j++)
        {
            scanf("%d", &mat[i][j]);
        }
        clear_input_buffer();
    }
}

void displayMatrix()
{
    printf("\nMatrix:\n");
    for (i = 0; i < rows; i++)
    {
        for (j = 0; j < cols; j++)
        {
            printf("%d\t", mat[i][j]);
        }
        printf("\n");
    }
    printf("\n");
}

void rowOP()
{
    printf("Enter the row operation (e.g., R1 + 2R2): ");
    scanf(" R%d %c %dR%d", &r1num, &operationType, &r2multiplier, &r2num);
    clear_input_buffer();

    int rowA = r1num - 1;
    int rowB = r2num - 1;

    if (operationType == '+')
    {
        for (j = 0; j < cols; j++)
        {
            mat[rowA][j] = mat[rowA][j] + (mat[rowB][j] * r2multiplier);
        }
    }
    else if (operationType == '-')
    {
        for (j = 0; j < cols; j++)
        {
            mat[rowA][j] = mat[rowA][j] - (mat[rowB][j] * r2multiplier);
        }
    }
    else
    {
        printf("Invalid operation type. Please use '+' or '-'.\n");
        return;
    }

    displayMatrix();
}

void inverseRow()
{
    printf("Row number to inverse: ");
    int rowNum;
    scanf("%d", &rowNum);
    clear_input_buffer();
    rowNum--;
    if (rowNum < 0 || rowNum >= rows)
    {
        printf("Invalid row number.\n");
        return;
    }
    for (j = 0; j < cols; j++)
    {
        mat[rowNum][j] = -mat[rowNum][j];
    }
    displayMatrix();
}

void rowInterchange()
{
    printf("Enter the two rows to interchange (e.g., 1 2): ");
    int row1, row2;
    scanf("%d %d", &row1, &row2);
    clear_input_buffer();

    row1--;
    row2--;

    if ((row1 < 0 || row1 >= rows) || (row2 < 0 || row2 >= rows))
    {
        printf("Invalid row numbers.\n");
        return;
    }

    for(j = 0; j < cols; j++)
    {
        int temp = mat[row1][j];
        mat[row1][j] = mat[row2][j];
        mat[row2][j] = temp;
    }
    displayMatrix();
}

void main()
{

    do
    {
        printf("1. Define a matrix\n");
        printf("2. Display the matrix\n");
        printf("3. Perform a row operation\n");
        printf("4. Inverse a row\n");
        printf("6. Row interchange\n");
        printf("7. Exit\n");
        printf("Enter your choice: ");
        scanf("%d", &choice);
        clear_input_buffer();

        switch (choice)
        {
            case 1:
            {
                defineMatrix();
                printf("Matrix defined successfully.\n");
                break;
            }
            case 2:
            {
                if (rows == 0 || cols == 0)
                {
                    printf("Matrix is not defined yet. Please define a matrix first.\n");
                }
                else
                {
                    displayMatrix();
                }
                break;
            }
            case 3:
            {
                if (rows == 0 || cols == 0)
                {
                    printf("Matrix is not defined yet. Please define a matrix first.\n");
                }
                else
                {
                    rowOP();
                }
                break;
            }
            case 4:
            {
                if (rows == 0 || cols == 0)
                {
                    printf("Matrix is not defined yet. Please define a matrix first.\n");
                }
                else
                {
                    inverseRow();
                }
                break;
            }
            case 6:
            {
                if (rows == 0 || cols == 0)
                {
                    printf("Matrix is not defined yet. Please define a matrix first.\n");
                }
                else
                {
                    rowInterchange();
                }
                break;
            }
            case 7:
            {
                printf("Exiting program...\n");
                return;
            }
            default:
            {
                printf("Invalid choice\n");
                continue;
            }
        }
        printf("\n");
    } while (choice != 7);
}