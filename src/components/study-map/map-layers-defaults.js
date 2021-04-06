import merge from 'deepmerge';

const styleDefaults = {
  circle: {
    paint: {
      'circle-color': '#5860FF',
      'circle-stroke-color': '#FFFFFF',
      'circle-stroke-opacity': 0.64,
      'circle-stroke-width': 2,
      'circle-radius': ['interpolate', ['linear'], ['zoom'], 6, 5, 12, 15]
    }
  },
  line: {
    paint: {
      'line-color': '#747BFC',
      'line-opacity': ['interpolate', ['linear'], ['zoom'], 6, 0.96, 12, 0.66],
      'line-width': ['interpolate', ['linear'], ['zoom'], 6, 1, 12, 2]
    }
  },
  symbol: {
    layout: {
      'icon-size': ['interpolate', ['linear'], ['zoom'], 6, 0.2, 12, 0.5],
      'icon-allow-overlap': true
    }
  }
};

export const applyMapLayersDefaults = (layers) => {
  if (!layers) return null;
  return layers.map((layer) => {
    if (!styleDefaults[layer.type]) return layer;

    // Merge custom layer properties from MB Style with the default ones.
    // Arrays are not concatenated, instead overwritten by custom props.
    return merge(styleDefaults[layer.type], layer, {
      arrayMerge: (destination, source) => source
    });
  });
};
