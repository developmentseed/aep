# Africa Electrification Platform
The Africa Electrification Platform showcases geospatial electrification analysis conducted by the GEPAR team at the World Bank.

* want to run the project locally? Check [DEVELOPMENT](/DEVELOPMENT.md)

## Content validation
The yml files with study configuration can be validated using:

```
yarn validate
```

## Custom markers
AEP supports a number of custom icons that can be used to style point data instead of colored circles. See the folder `/content/icons` for the icons that are currently supported.

### Add icon to a layer
Define a [`symbol`](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#symbol) layer. The name of the `icon-image` is the basename of the file, without extension `.png`.

For example:

``` json
{
  "id": "transformers",
  "type": "symbol",
  "source": "transformers",
  "source-layer": "data_layer",
  "layout": {
    "icon-image": "electricity"
  }
}
```

### Add new icons to AEP
Icons should be in `.png` format, 64 x 64.

1. add the `png` file to `/content/icons`
2. use as indicated in the previous section
