/**
 * Создает экземпляр Машины
 * @this {Car}
 * @param {string} manufacturer Производитель
 * @param {string} model Модель
 * @param {number} year Год производство
 */
function Car(manufacturer, model, year) {
    this.manufacturer = manufacturer;
    this.model = model;
    this.year = year || new Date().getFullYear();
	
	this.getInfo = this.toString = function() {
		return this.manufacturer + ' ' + this.model + ' ' + this.year;
	}
	
	this.getDetailedInfo = function(){
		return 'Производитель: ' + this.manufacturer + '. '
			+ 'Модель: ' + this.model + '. ' 
			+ 'Год: ' + this.year
	}
	
}
// @DONE: если конструктор вызывается без указания текущего года, то подставлять текущий
// @DONE: реализовать методы вывода информации о машине: 
// console.log(bmw); // BMW X5 2010
// console.log(bmw.getInfo()); // BMW X5 2010
// console.log(bmw.getDetailedInfo()); // Производитель: BMW. Модель: X5. Год: 2010

var bmw = new Car("BMW", "X5", 2010),
    audi = new Car("Audi", "Q5", 2012),
    toyota = new Car("Toyota", "Camry");


/**
 * Создает экземпляр Автосалона
 * @this {CarDealer}
 * @param {string} name Название автосалона
 */
function CarDealer(name) {
    this.name = name;
    this.cars = [];
	
	var 
		self = this,
		priceReader = /\s*([^\d\s]+)\s*(\d+)\s*/i,
		//@NOTE: в боевом режиме, обменник должен инициализироваться с какого-то источника курсов валют, и код тогда будет асинхронным.
		// Поскольку это тестовое задание, он проинициализирован статически.
		exchanger = new CurrencyManager({
			'EUR': 0.805917,
			'JPY': 78.557231,
			'RUB': 31.569825
		});
		
	this.add = function() {
		self.cars = self.cars.concat(
			Array.prototype.splice.call(arguments, 0, arguments.length)
		);
		return self;
	};
	
	this.setPrice = function(id, price) {
		for(var i = 0, count = self.cars.length; i < count; i++ ) {
			if(self.cars[i].toString() === id){
				var match = price.match(priceReader);
				if(match.length >= 3){
					self.cars[i].price = {currency: exchanger.resolve(match[1]), value: match[2]};
				}
			}
		}
		return self;
	};
	
	this.list = function(){
		return self.cars.join(', ');
	};
	
	this.listByCountry = function(country){
		var _cars = [];
		for(var i = 0, count = self.cars.length; i < count; i++) {
			if(getCountry.call(self.cars[i])===country){
				_cars.push(self.cars[i]);
			}
		}
		return _cars.join(', ');
	}
	
	this.listWithPrice = function(symbol){
		var _cars = [];
		for(var i = 0, count = self.cars.length; i < count; i++) {
			var price = self.cars[i].price 
				? exchanger.convert(self.cars[i].price.currency, self.cars[i].price.value, exchanger.resolve(symbol))
				: 'unknown'
			_cars.push(self.cars[i] +' - ' + symbol + price);
		}
		return _cars.join(', ');
	}
}
/**
 * Создаёт объект для работы с валютами
 * @this {CurrencyManager}
 * @param {object} courses - словарь валют вида 'обозначение' : курс
 */
var CurrencyManager = function(courses){
	this.resolve = function (symbol){
		switch(symbol){
			case '€':
				return 'EUR';
			case '?':
				return 'JPY';
			case 'руб.':
				return 'RUB';
			default:
				return symbol;
		}
	};
	
	this.convert = function(from, value, to) {
		if(courses[from] && courses[to]){
			return (value * courses[to] / courses[from]).toFixed(2);
		} else
			throw TypeError('Unknown currency - can\'t convert!');
	};
}

var yandex = new CarDealer('Яндекс.Авто');

// @DONE: реализовать метод добавления машин в автосалон. Предусмотреть возможность добавления одной машины, нескольких машин.
yandex
    .add(toyota)
    .add(bmw, audi);

// @DONE: реализовать метод установки цены на машину
/**
 * Установить цену на машину
 * @param {string} car идентификатор машины
 * @param {string} price стоимость
 */
// идентификатор машины составляется следующим образом "производитель модель год"
// стоимость машины может быть задана в двух валютах: йена и евро.
yandex
    .setPrice('BMW X5 2010', '€2000')
    .setPrice('Audi Q5 2012', '€3000')
    .setPrice('Toyota Camry 2012', '?3000');

// @DONE: реализовать вывод списка автомобилей в продаже, с фильтрацией по стране производителю, используя метод getCountry:
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

// @DONE: бонус! выводить список машин с ценой в рублях.

yandex.listWithPrice('руб.');
