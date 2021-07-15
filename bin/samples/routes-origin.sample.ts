import { Route, view } from "react-nuts/components/ViewRouter"

Route.path("/", view("home"), "EXACT_PATH")
// Route.path("/support/:ticketId", view("support"))