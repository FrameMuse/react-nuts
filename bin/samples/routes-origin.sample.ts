import { Route, view } from "react-nuts/components/ViewRouter"

Route.path("/", view("home"), "ExactPath")
// Route.path("/support/:ticketId", view("support"))