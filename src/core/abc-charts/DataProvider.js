import { DataProvider } from 'abc-charts/dataProvider';
import cloneDeep from 'lodash/cloneDeep';
import Const from './../Const';

let dp = null;
let getDataProviderInstance = () => {
    dp = dp || new DataProvider(Const.WFM_DATAPROVIDER_API_URL);
    return dp;
};

export default {
    /**
     * DataProvider graphql load method
     * @param {DataSet} dataset
     * @return {Promise}
     */
    load(dataset, hasEntity = false) {
        return getDataProviderInstance().parseTemplate(
            {
                server: 'druid',
                dataSets: [dataset]
            },
            hasEntity
        );
    },
    /**
     * Returns mounted() mixin which generates 'descriptor.vars' from 'this.props.dataset' dimensions with 'groupBy:true'
     * @return {object}
     */
    datasetVarsMixin() {
        let dimensionVars = ds => {
            let d = {};
            if (!ds) {
                return {};
            }
            ds.dataSetTemplates.forEach(dst => {
                dst.dataSource1.dimensions.forEach(dimension => {
                    if (dimension.groupBy) {
                        d[dimension.name] = {
                            description: dimension.name
                        };
                    }
                });
            });
            return d;
        };
        return {
            mounted: function() {
                if (!this.isEditorMode) {
                    return;
                }
                this.$set(this.descriptor.vars, 'orgunit-select', {
                    description: 'orgunit-select'
                });
                this.$watch('props.dataset', {
                    deep: true,
                    immediate: true,
                    handler: function(newVal, oldVal) {
                        let dimVars = dimensionVars(oldVal);
                        for (let name in dimVars) {
                            this.$delete(this.descriptor.vars, name);
                        }
                        dimVars = dimensionVars(newVal);
                        for (let name in dimVars) {
                            this.$set(this.descriptor.vars, name, dimVars[name]);
                        }
                    }
                });
            }
        };
    },
    filterDataset(params, propsDataset) {
        let dataset = cloneDeep(propsDataset);
        if (!dataset) {
            return null;
        }
        for (let key in params) {
            if (key && key !== 'orgunit-select') {
                let index = dataset.dimensions.findIndex(item => item.name === key);

                if (index !== -1) {
                    dataset.dimensions[index].values = [params[key]];

                    dataset.dataSetTemplates.forEach(dsTemplate => {
                        dsTemplate.dataSource1.dimensions.forEach(ds => {
                            if (ds.name === key) {
                                ds.values = [params[key]];
                            }
                        });
                    });
                }
            } else if (key && key === 'orgunit-select') {
                for (let dim in params[key]) {
                    let index = dataset.dimensions.findIndex(item => item.name === dim);

                    if (index !== -1) {
                        dataset.dimensions[index].values = params[key][dim];
                        dataset.dataSetTemplates.forEach(dsTemplate => {
                            dsTemplate.dataSource1.dimensions.forEach(ds => {
                                if (ds.name === dim) {
                                    ds.values = params[key][dim];
                                }
                            });
                        });
                    }
                }
            }
        }
        return dataset;
    }
};
