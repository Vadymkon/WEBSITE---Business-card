#include <iostream>
#include <vector>
using namespace std;
vector <double> Atab{ 0.019, 0.127, 0.346, 0.417, 0.527, 0.696 }; //таблица с
значениями а
double h = 0.001;
vector <double> genT () //генерация х-ов
{
float a = 0, b = 1; //границы интегрированния
vector <double> Xtab;
for (a; a <= b; a += h) { //непосредственно генератор списка
Xtab.push_back(a);
}
return Xtab;
}
double func(double x, double a) { //расчёт подинтегральной функции
double rez = pow(exp(1), (a * x)) * (1 + x * x) * (sin(x) / (x + 2));
return rez;
}
vector <double> genT_Y(vector <double> Xtab, double a) //генератор у-ков для
всех х-ов и конкретной "а"
{
vector <double> Ytab;
for (int i = 0; i < Xtab.size(); i++)
{
Ytab.push_back(func(Xtab[i], a));
}
return Ytab;
}
double Simpson(vector <double> Ytab, double h) //метод симпсона
{
double sum1=0, sum2=0; //"допомога" в розрахунках
for (int i = 1; i < Ytab.size(); i += 2)
{ //вот тут может быть ощибка из-за количества повтора(но не факт))
sum1 += Ytab[i]; //подсчёт всех НЕчётных членов при учёте
нулевого члена
}
for (int i = 2; i < Ytab.size(); i += 2) //генератор коефициентов
{
sum1 += Ytab[i]; //подсчёт всех чётных членов при учёте нулевого
члена
}
double rez = h / 4 * ((Ytab[0] + Ytab[Ytab.size() - 1]) + 4 * sum1 + 2 * sum2);
//расчёт
return rez;
}
int main()
{
vector <double> SimpsonsREZ; //массив с выходными данными для
каждого отдельного "а"
vector <double> Xtab = genT();
for (int i = 0; i < Atab.size(); i++) { //отдельный расчёт игриков для каждого
отдельного "а"
vector <double> Ytab = genT_Y(Xtab, Atab[i]);
SimpsonsREZ.push_back(Simpson(Ytab, h));
}
for (int i = 0; i < Atab.size(); i++) ///вывод
{
cout << "\nFor a = " << Atab[i] << " Simp_result = " << SimpsonsREZ[i];
}
}
