const sequelize = require('../db');
const { DataTypes } = require('sequelize');

// Модель пользователя
const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('admin', 'user'), 
        allowNull: false,
        defaultValue: 'user' 
    }
});

// Модель рейса
const Flight = sequelize.define('flight', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    airportArrival: {
        type: DataTypes.STRING,
        allowNull: false
    },
    airportDeparture: {
        type: DataTypes.STRING,
        allowNull: false
    },
    aviacompany: {
        type: DataTypes.STRING, // Изменим на STRING, так как авиакомпания будет представлена строкой
        allowNull: false
    }
});

// Модель таблицы с номерами рейсов
const FlightNumber = sequelize.define('flight_number', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    aviacompany: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

// Модель избранных рейсов
const Favorite = sequelize.define('favorite', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// Устанавливаем связи между моделями с помощью внешних ключей
User.hasMany(Favorite); // Один пользователь может иметь много избранных рейсов
Favorite.belongsTo(User); // Каждый избранный рейс принадлежит одному пользователю

Flight.hasMany(Favorite); // Один рейс может быть избранным для многих пользователей
Favorite.belongsTo(Flight); // Каждый избранный рейс ссылается на один рейс

FlightNumber.belongsTo(Flight); // Каждый номер рейса принадлежит одному рейсу
Flight.hasMany(FlightNumber); // Один рейс может иметь много номеров рейса

module.exports = {
    User,
    Flight,
    Favorite,
    FlightNumber
};