import React, { useState } from "react";
import axios from "axios";
import { axiosWithAuth } from "../utils/axiosAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors, setDependency }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const [addColor, setAddColor] = useState({
    color: "",
    code: { hex: "#" },
    id: Date.now()
  });

  const addColorSubmitHandler = event => {
    event.preventDefault();

    axiosWithAuth().post("http://localhost:5000/api/colors/", addColor)
    .then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });

    setDependency(true);
  };

  const addColorChangeHandler = event => {
    setAddColor({
      ...addColor,
      [event.target.name]: event.target.name === "code" ? {hex: event.target.value} : event.target.value  
    });
  };

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth().put("http://localhost:5000/api/colors/" + colorToEdit.id, colorToEdit)
    .then(res =>{
      setDependency(true);
    })
    .catch(err => {
      console.log(err);
    });
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth().delete("http://localhost:5000/api/colors/" + colorToEdit.id)
    .then(res => {
      setDependency(true);
    })
    .catch(err => {
      console.log(err);
    });
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <form onSubmit={addColorSubmitHandler}>
        <h2>add color</h2>
        <label htmlFor="color">color name</label>
        <input type="text" name="color" id="color" value={addColor.name} onChange={addColorChangeHandler} />
        <label htmlFor="code">color hex</label>
        <input type="text" name="code" id="code" value={addColor.code.hex} onChange={addColorChangeHandler} />
        <button type="submit">Submit</button>
      </form>
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
