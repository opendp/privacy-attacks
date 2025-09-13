
const spec = {
    "$schema": "https://vega.github.io/schema/vega/v5.json",
    "description": "Visualization of differential privacy using Laplacian noise distribution",
    "width": 500,
    "height": 100,
    "padding": 5,
  
    "signals": [
      {
        "name": "epsilon",
        "value": 1,
        "bind": {
          "input": "range", 
          "min": 0.01,
          "max": 10, 
          "step": 0.01,
          "name": "Epsilon (ε)"
          }
      },
      {
        "name": "minDomain",
        "update": "0 - (5 / epsilon)"
      },
      {
        "name": "maxDomain",
        "update": "0 + (5 / epsilon)"
      },
      {
        "name": "maxY",
        "update": "epsilon / 2.0"
      },
      {
        "name": "expectedError",
        "update": "1 / epsilon"
      }
    ],
  
    "data": [
      {
        "name": "distribution",
        "transform": [
          {
            "type": "sequence",
            "start": {"signal": "minDomain"},
            "stop": {"signal": "maxDomain"},
            "step": 0.01,
            "as": "value"
          },
          {
            "type": "formula",
            "expr": "exp(-abs(datum.value) * epsilon) / (2.0 / epsilon)",
            "as": "density"
          }
        ]
      }
    ],
  
    "scales": [
      {
        "name": "xscale",
        "type": "linear",
        "range": "width",
        "domain": [{"signal": "minDomain"}, {"signal": "maxDomain"}],
        "nice": false
      },
      {
        "name": "yscale",
        "type": "linear",
        "range": "height",
        "domain": [0, {"signal": "maxY"}],
        "nice": false
      }
    ],
  
    "axes": [
      {"orient": "bottom", "scale": "xscale", "zindex": 1},
      {"orient": "left", "scale": "yscale", "zindex": 1, "tickCount": 5}
    ],
  
  "marks": [
    {
      "type": "area",
      "from": {"data": "distribution"},
      "encode": {
        "update": {
          "x": {"scale": "xscale", "field": "value"},
          "y": {"scale": "yscale", "field": "density"},
          "y2": {"scale": "yscale", "value": 0},
          "fill": {"value": "steelblue"}
        }
      }
    },
    {
      "type": "rule",
      "encode": {
        "update": {
          "x": {"scale": "xscale", "value": 0},
          "y": {"value": 0},
          "y2": {"field": {"group": "height"}},
          "stroke": {"value": "red"}
        }
      }
    },
    {
        "type": "text",
        "encode": {
          "enter": {
            "x": {"value": 20},
            "y": {"value": 20},
            "text": {"value": "Expected Error: Truth"},
            "fontSize": {"value": 12},
            "fill": {"value": "black"}
          }
        }
      },
      {
        "type": "text",
        "encode": {
          "enter": {
            "x": {"signal": "140"},
            "y": {"value": 20},
            "fontSize": {"value": 12},
            "fontWeight": {"value": "bold"},
            "fill": {"value": "black"}
          },
          "update":{
            "text": {"signal": "'±' + format(1/epsilon, '.2f')"}
          }
        }
      }
  ]
  
}

window.addEventListener("load", () => {
    // eslint-disable-next-line no-undef
    vegaEmbed('#epsilon-expected-error', spec);
});