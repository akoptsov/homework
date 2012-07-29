/**
 * ������� ��������� ������
 * @this {Car}
 * @param {string} manufacturer �������������
 * @param {string} model ������
 * @param {number} year ��� ������������
 */
function Car(manufacturer, model, year) {
    this.manufacturer = manufacturer;
    this.model = model;
    this.year = year;
}
// @TODO: ���� ����������� ���������� ��� �������� �������� ����, �� ����������� �������
// @TODO: ����������� ������ ������ ���������� � ������: 
// console.log(bmw); // BMW X5 2010
// console.log(bmw.getInfo()); // BMW X5 2010
// console.log(bmw.getDetailedInfo()); // �������������: BMW. ������: X5. ���: 2010

var bmw = new Car("BMW", "X5", 2010),
    audi = new Car("Audi", "Q5", 2012),
    toyota = new Car("Toyota", "Camry");


/**
 * ������� ��������� ����������
 * @this {CarDealer}
 * @param {string} name �������� ����������
 */
function CarDealer(name) {
    this.name = name;
    this.cars = [];
}

var yandex = new CarDealer('������.����');

// @TODO: ����������� ����� ���������� ����� � ���������. ������������� ����������� ���������� ����� ������, ���������� �����.
yandex
    .add(toyouta)
    .add(bmw, audi);

// @TODO: ����������� ����� ��������� ���� �� ������
/**
 * ���������� ���� �� ������
 * @param {string} car ������������� ������
 * @param {string} price ���������
 */
// ������������� ������ ������������ ��������� ������� "������������� ������ ���"
// ��������� ������ ����� ���� ������ � ���� �������: ���� � ����.
yandex
    .setPrice('BMW X5 2010', '�2000')
    .setPrice('Audi Q5 2012', '�3000')
    .setPrice('Toyota Camry 2012', '?3000');

// @TODO: ����������� ����� ������ ����������� � �������, � ����������� �� ������ �������������, ��������� ����� getCountry:
function getCountry() {
    switch (this.manufacturer.toLowerCase()) {
        case 'bmw':
	case 'audi':
            return 'Germany';

        case 'toyota':
            return 'Japan';
	}
}

yandex.list(); //BMW X5 2010, Audi Q5 2012, Toyota Camry 2012
yandex.listByCountry('Germany'); //BMW X5 2010, Audi Q5 2012

// @TODO: �����! �������� ������ ����� � ����� � ������.
���������: http://company.yandex.ru/job/vacancies/shri.xml