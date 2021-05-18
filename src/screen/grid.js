import React from "react";
import { Stage, Layer, Rect } from "react-konva";
import { useSelector } from "react-redux";
var mapConfig = [];

function generateShapes(config) {
  for (let i = 0; i < config.gridWidth; i++) {
    for (let j = 0; j < config.gridHeigth; j++) {
      if (j % config.columnToSelect === 0 && j >= 1) {
        if (
          (config.upWall === true && i === 0) ||
          (config.downWall === true && i === config.gridHeigth - 1) ||
          (config.leftWall === true && j === 0) ||
          (config.rightWall === true && j === config.gridWidth - 1)
        ) {
          mapConfig.push({
            id: i.toString() + j.toString(),
            x: j * 60,
            y: i * 60,
            color: "#e8eaf6",
            selected: false,
          });
        } else {
          mapConfig.push({
            id: i.toString() + j.toString(),
            x: j * 60,
            y: i * 60,
            color: "#3f51b5",
            selected: true,
          });
        }
      } else {
        mapConfig.push({
          id: i.toString() + j.toString(),
          x: j * 60,
          y: i * 60,
          color: "#e8eaf6",
          selected: false,
        });
      }
    }
  }
  return mapConfig;
}

function Grid() {
  const config = useSelector((state) => state);

  var INITIAL_STATE = generateShapes({
    name: "",
    gridWidth: 0,
    gridHeigth: 0,
    columnToSelect: 0,
    leftWall: false,
    rightWall: false,
    upWall: false,
    downWall: false,
    entrance: false,
  });

  if ((config != undefined)) {
    INITIAL_STATE = generateShapes(config);
  }

  var layerRef = React.useRef(null);

  const [rects, setRect] = React.useState(INITIAL_STATE);

  var rectsToConfigure = [];

  const toggleRect = (node, rect) => {
    if (rect.selected === false) {
      rect.selected = true;
      node.target.attrs.fill = "#3f51b5";
      rectsToConfigure.push(rect);
    } else {
      rect.selected = false;
      node.target.attrs.fill = "#e8eaf6";
      if (rectsToConfigure.length !== 0) {
        for (var i = 0; i < rectsToConfigure.length; i++) {
          if (rectsToConfigure[i] === rect) {
            rectsToConfigure.splice(i, 1);
          }
        }
      }
    }
    layerRef.current.draw();
  };

  // const deleteAll = () => {
  //   rectsToConfigure = [];
  //   layerRef.current.draw();
  // };

  return (
    <div>
      <h1>{config.name}</h1>
      {/* <button
        onClick={deleteAll}
        style={{
          marginBottom: 10,
          padding: 10,
          border: "none",
          borderRadius: 5,
        }}
      >
        Izbriši sve
      </button> */}
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ width: 0, paddingLeft: 25, paddingRight: 25 }}></div>
        <div>
          {[...Array(Number(config.gridWidth))].map((_, i) => (
            <span
              style={{
                display: "inline-block",
                width: 50,
                textAlign: "center",
                paddingRight: 10,
              }}
            >
              {i}
            </span>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "row" }}>
        <div>
          {[...Array(Number(config.gridHeigth))].map((_, i) => (
            <div
              style={{
                width: 10,
                height: 50,
                paddingRight: 15,
                paddingLeft: 25,
                paddingBottom: 10,
                display: "flex",
                alignItems: "center",
              }}
            >
              {i}
            </div>
          ))}
        </div>
        <Stage width={config.gridWidth * 60} height={config.gridHeigth * 60}>
          <Layer ref={layerRef}>
            {rects.map((rect) => (
              <Rect
                // key={rect.id}
                id={rect.id}
                x={rect.x}
                y={rect.y}
                width={50}
                height={50}
                fill={rect.color}
                onClick={(node) => toggleRect(node, rect)}
                onTap={(node) => toggleRect(node, rect)}
              />
            ))}
          </Layer>
        </Stage>
      </div>
    </div>
  );
}

export default Grid;
