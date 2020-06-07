'use strict';

var offerFactory = function (size) {

  var getRandomInt = function (max) {
    return Math.floor(Math.random() * Math.floor(max));
  };

  var arrayShuffle = function (array) {
    // eslint-disable-next-line no-unused-vars
    array.sort(function (e) {
      return Math.random() - 0.5;
    });
  };

  var getRandomArrayElement = function (array) {
    var arrayLength = array.length;
    var randomIndex = getRandomInt(arrayLength);
    return array[randomIndex];
  };

  var getRandomArrayElements = function (source) {
    var len = getRandomInt(source.length) + 1;
    var result = source.copyWithin(0, 0);
    arrayShuffle(result);
    for (var i = source.length; i > len; i--) {
      result.pop();
    }
    return result;
  };

  var avatarGenerator = {
    ar: [],
    size: function () {
      return this.ar.length;
    },
    generate: function (count) {
      for (var i = 1; i <= count; i++) {
        var index = i;
        if (i < 10) {
          index = '0' + i;
        }
        this.ar.push('img/avatars/user' + index + '.png');
      }
      arrayShuffle(this.ar);
    },
    pop: function () {
      return this.ar.pop();
    }
  };

  var generatePinInfo = function () {

    var getRandomAvatar = function () {
      if (avatarGenerator.size() === 0) {
        avatarGenerator.generate(8);
      }
      return avatarGenerator.pop();
    };

    var locationX = getRandomInt(800);
    var locationY = getRandomInt(500) + 50;

    return {
      'author': {
        'avatar': getRandomAvatar(),
      },
      'offer': {
        'title': getRandomArrayElement(['1-я квартира', '2-я квартира', '3-я квартира']),
        'address': locationX + ', ' + locationY,
        'price': getRandomArrayElement([10000, 20000, 30000, 40000, 50000, 600000, 70000]),
        'type': getRandomArrayElement(['palace', 'flat', 'house', 'bungalo']),
        'rooms': getRandomArrayElement([1, 2, 3, 4, 5]),
        'guests': getRandomArrayElement([1, 2, 3, 4, 5, 6, 7]),
        'checkin': getRandomArrayElement(['12:00', '13:00', '14:00']),
        'checkout': getRandomArrayElement(['12:00', '13:00', '14:00']),
        'features': getRandomArrayElements(['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']),
        'description': getRandomArrayElement(['Просторная', 'Уютная', 'Комфортная', 'Близко к центру']),
        'photos': getRandomArrayElements(['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']),
      },
      'location': {
        'x': locationX,
        'y': locationY
      }
    };
  };

  var res = [];
  for (var i = 0; i < size; i++) {
    res.push(generatePinInfo());
  }
  return res;
};

var pinButton = document.getElementById('pin').content.querySelector('button');
var mapPins = document.querySelector('.map__pins');

var generatePinFragment = function (info) {
  var fragment = document.createDocumentFragment();
  var pin = pinButton.cloneNode(true);
  fragment.appendChild(pin);

  var img = pin.querySelector('img');
  img.src = info.author.avatar;
  img.alt = info.offer.title;

  var x = info.location.x + 50 / 2;
  var y = info.location.y + 70;

  pin.setAttribute('style', 'left: ' + x + 'px; top: ' + y + 'px;');
  return fragment;
};

offerFactory(8).forEach(function (info) {
  var fragment = generatePinFragment(info);
  mapPins.appendChild(fragment);
});
