const spec = {
    "$schema": "https://vega.github.io/schema/vega/v5.json",
    "width": 500,
    "height": 300,
    "padding": 5,
    "signals": [
      {
        "name": "epsilon",
        "value": 1,
        "bind": {"input": "range", "min": 0.01, "max": 5, "step": 0.01, "name": "Epsilon (ε)"}
      },
      {
        "name": "delta",
        "value": 0.0005,
        "bind": {"input": "range", "min": 0.00001, "max": 0.002, "step": 0.00001, "name": "Delta (δ)"}
      },
      {
        "name": "sigma",
        "update": "sqrt((2 * log(1.25 / delta))) / epsilon"
      },
      {
        "name": "dpDomain",
        "update": "(2 * log(1.25 / delta)) / epsilon"
      }
    ],
    "data": [
      {
        "name": "values",
        "transform": [
          {
            "type": "sequence",
            "start": -40,
            "stop": 40,
            "step": 0.1,
            "as": "x"
          },
          {
            "type": "formula",
            "expr": "log(epsilon / 2.0) - epsilon * abs(datum.x)",
            "as": "laplace"
          },
          {
            "type": "formula",
            "expr": "log(1.0 / (sqrt(2.0 * PI) * sigma)) - (datum.x * datum.x) / (2 * sigma * sigma)",
            "as": "gaussian"
          },
          {
            "type": "formula",
            "expr": "min(datum.laplace, datum.gaussian)",
            "as": "minLaplaceGaussian"
          },
          {
            "type": "formula",
            "expr": "max(datum.laplace, datum.gaussian)",
            "as": "maxLaplaceGaussian"
          }
        ]
      },
      {
        "name": "xa",
        "transform": [
          {
            "type": "sequence",
            "start": -40,
            "stop": {"signal": "-dpDomain"},
            "step": 0.1,
            "as": "x"
          },
          {
            "type": "formula",
            "expr": "log(epsilon / 2.0) - epsilon * abs(datum.x)",
            "as": "laplace"
          },
          {
            "type": "formula",
            "expr": "log(1.0 / (sqrt(2.0 * PI) * sigma)) - (datum.x * datum.x) / (2 * sigma * sigma)",
            "as": "gaussian"
          }
        ]
      },
      {
        "name": "xb",
        "transform": [
          {
            "type": "sequence",
            "start":{"signal": "-dpDomain"},
            "stop": {"signal": "dpDomain"},
            "step": 0.1,
            "as": "x"
          },
          {
            "type": "formula",
            "expr": "log(epsilon / 2.0) - epsilon * abs(datum.x)",
            "as": "laplace"
          },
          {
            "type": "formula",
            "expr": "log(1.0 / (sqrt(2.0 * PI) * sigma)) - (datum.x * datum.x) / (2 * sigma * sigma)",
            "as": "gaussian"
          }
        ]
      },{
        "name": "xc",
        "transform": [
          {
            "type": "sequence",
            "start": {"signal": "dpDomain"},
            "stop": 40,
            "step": 0.1,
            "as": "x"
          },
          {
            "type": "formula",
            "expr": "log(epsilon / 2.0) - epsilon * abs(datum.x)",
            "as": "laplace"
          },
          {
            "type": "formula",
            "expr": "log(1.0 / (sqrt(2.0 * PI) * sigma)) - (datum.x * datum.x) / (2 * sigma * sigma)",
            "as": "gaussian"
          }
        ]
      }
    ],
    "scales": [
      {
        "name": "xscale",
        "type": "linear",
        "range": "width",
        "domain": [ -40, 40]
      },
      {
        "name": "yscale",
        "type": "linear",
        "range": "height",
        "nice": true,
        "domain": [
          -80, 1]
      },
      {
        "name": "color",
        "type": "ordinal",
        "domain": ["DP holds", "DP does not hold"],
        "range": ["lightgreen", "lightred"]
      }
    ],
  
    "marks": [
      {
          "type": "text",
          "encode": {
            "enter": {
              "x": {"value": 20},
              "y": {"value": 20},
              "text": {"value": "Expected Error of Gaussian Noise: Truth"},
              "fontSize": {"value": 14},
              "fill": {"value": "black"}
            }
          }
        },
      {
          "type": "text",
          "encode": {
            "enter": {
              "x": {"signal": "280"},
              "y": {"value": 20},
              "fontSize": {"value": 14},
              "fontWeight": {"value": "bold"},
              "fill": {"value": "black"}
            },
            "update":{
              "text": {"signal": "'±' + format(sigma, '.2f')"}
            }
          }
        },
      {
        "type": "rule",
        "encode": {
          "update": {
            "x": {"scale": "xscale", "signal": "-dpDomain"},
            "y": {"value": 0},
            "y2": {"field": {"group": "height"}},
            "stroke": {"value": "red"},
            "strokeWidth": {"value": 2},
            "opacity":{"value": 0.5}
          }
        }
      },
      {
        "type": "rule",
        "encode": {
          "update": {
            "x": {"scale": "xscale", "signal": "dpDomain"},
            "y": {"value": 0},
            "y2": {"field": {"group": "height"}},
            "stroke": {"value": "red"},
            "strokeWidth": {"value": 2},
            "opacity":{"value": 0.5}
          }
        }
      },
      {
        "type": "area",
        "from": {"data": "xa"},
        "encode": {
          "update": {
            "x": {"scale": "xscale", "field": "x"},
            "y": {"scale": "yscale", "field": "laplace"},
            "y2": {"scale": "yscale", "field": "gaussian"},
            "fill": {"value": "red"},
            "opacity": {"value": 0.35}
          }
        }
      },
      {
        "type": "area",
        "from": {"data": "xb"},
        "encode": {
          "update": {
            "x": {"scale": "xscale", "field": "x"},
            "y": {"scale": "yscale", "field": "laplace"},
            "y2": {"scale": "yscale", "field": "gaussian"},
            "fill": {"value": "lightgreen"},
            "opacity": {"value": 0.5}
          }
        }
      },
      {
        "type": "area",
        "from": {"data": "xc"},
        "encode": {
          "update": {
            "x": {"scale": "xscale", "field": "x"},
            "y": {"scale": "yscale", "field": "laplace"},
            "y2": {"scale": "yscale", "field": "gaussian"},
            "fill": {"value": "red"},
            "opacity": {"value": 0.35}
          }
        }
      },
      {
        "type": "line",
        "from": {"data": "values"},
        "encode": {
          "update": {
            "x": {"scale": "xscale", "field": "x"},
            "y": {"scale": "yscale", "field": "laplace"},
            "stroke": {"value": "black"},
            "strokeWidth": {"value": 2}
          }
        }
      },
      {
        "type": "line",
        "from": {"data": "values"},
        "encode": {
          "update": {
            "x": {"scale": "xscale", "field": "x"},
            "y": {"scale": "yscale", "field": "gaussian"},
            "stroke": {"value": "black"},
            "strokeDash": {"value": [8, 8]},
            "strokeWidth": {"value": 2}
          }
        }
      }
    ],
  
    "axes": [
    {
      "orient": "bottom",
      "scale": "xscale",
      "title": "Noise Value",  
      "titlePadding": 10,  
      "titleFontSize": 12,  
      "titleFont": "Arial",  
      "titleFontWeight": "normal"  
    },
    {
      "orient": "left",
      "scale": "yscale",
      "title": "Log Probability",  
      "titlePadding": 10,
      "titleFontSize": 12,
      "titleFont": "Arial",
      "titleFontWeight": "normal"
    }
  ]
  
}
  

window.addEventListener("load", () => {
    // eslint-disable-next-line no-undef
    vegaEmbed('#laplace-to-gaussian', spec);
});