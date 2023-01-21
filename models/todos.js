"use strict";

/*
 * El objetivo es hacer un TO DO LIST:
 *   vas a tener que agregarle tareas a distintas personas y
 *   configurar propiedades de esas tareas.
 *
 *    (\
 *    \'\
 *     \'\     __________
 *     / '|   ()_________)
 *     \ '/    \ ~~~~~~~~ \
 *      \       \ ~~~~~~   \
 *      ==).      \__________\
 *     (__)       ()__________)
 */

var tasks = {}; // acá vamos a guardar nuestras personas y tareas

module.exports = {
  reset: function () {
    tasks = {}; // esta función ya esta armada :D
  },
  // ==== COMPLETEN LAS SIGUIENTES FUNCIONES (vean los test de `model.js`) =====
  listPeople: function () {
    // devuelve un arreglo de personas con tareas
    return Object.keys(tasks);
  },
  add: function (name, task) {
    // guarda una tarea para una persona en particular
    // si tiene la tarea ya seteada no la agregues, si no inicializala en false
    if (!Object.keys(task).includes("complete")) {
      task.complete = false;
    }
    // si ese nombre ya existe agregale la tarea dentro de sus values
    if (tasks[name]) {
      tasks[name] = [...tasks[name], task];
    } else {
      // si no, crea un nombre nuevo con esa tarea como valor
      tasks[name] = [task];
    }
  },
  list: function (name) {
    // devuelve el listado de tareas de determianda persona
    return tasks[name];
  },
  complete: function (name, index) {
    //cambia el estado de la tarea a completado (`true`)
    let completeProp = tasks[name][index].complete;
    completeProp === true
      ? (tasks[name][index].complete = false)
      : (tasks[name][index].complete = true);
    },
    remove: function(name, index){
      //remueve una tarea de una persona por indice
    tasks[name].splice(index, 1)
  }
};
