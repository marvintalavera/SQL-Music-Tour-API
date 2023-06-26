'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({stage, Meet_greet, set_time,stage_event}) {
      Event.belongsToMany(stage, {
        foreignKey: "event_id",
        as: "stages",
        through: stage_event
      })
      Event.hasMany(Meet_greet, {
        foreignKey:'event_id',
        as:'meet_greets'
      })
      Event.hasMany(set_time,{
        foreignKey:'event_id',
        as: 'set_times'
      })
    }
  }
  Event.init({
    event_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date:{ 
        type: DataTypes.DATE,
        timestamps: false,
        allowNull: false
    },
    available_start_time: {
        type: DataTypes.DATE,
        allowNull: false,
        timestamps: false
    },
    end_time: {
        type: DataTypes.DATE,
        timestamps: false,
        allowNull: false
    }
 }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};