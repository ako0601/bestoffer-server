"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/", () => {
  return { greeting: "Hello world in JSON" };
});

Route.group(() => {
  Route.post("add", "NoticeController.create");
  Route.get("/", "NoticeController.list");
  Route.get("/:id", "NoticeController.detail");
}).prefix("notices");

Route.group(() => {
  Route.post("/add", "GalleryController.create");
  Route.get("/", "GalleryController.helpTest");
}).prefix("gallery");
