'use strict';

import "./style.css";
import getPlayerMove from "./playerInput";

const field = document.querySelector("#playing-field");

field.addEventListener("click", getPlayerMove);