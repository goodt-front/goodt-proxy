import { DataProvider } from 'abc-charts/dataProvider';
import cloneDeep from 'lodash/cloneDeep';
import GlobalConstants from '../Const';

let dp = null;
const getDataProviderInstance = () => {
    dp = dp || new DataProvider(GlobalConstants.WFM_DATAPROVIDER_API_URL);
    return dp;
};

export default {
    /**
     * DataProvider graphql load method
     * @param {DataSet} dataset
     * @param {boolean} [hasEntity=false]
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
        const dimensionVars = ds => {
            const d = {};
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
            mounted() {
                if (!this.isEditorMode) {
                    return;
                }
                this.$set(this.descriptor.vars, 'orgunit-select', {
                    description: 'orgunit-select'
                });
                this.$watch('props.dataset', {
                    deep: true,
                    immediate: true,
                    handler(newVal, oldVal) {
                        let dimVars = dimensionVars(oldVal);
                        for (const name in dimVars) {
                            this.$delete(this.descriptor.vars, name);
                        }
                        dimVars = dimensionVars(newVal);
                        for (const name in dimVars) {
                            this.$set(this.descriptor.vars, name, dimVars[name]);
                        }
                    }
                });
            }
        };
    },

    filterDataset(params, propsDataset) {
        const dataset = cloneDeep(propsDataset);
        if (!dataset) {
            return null;
        }
        for (const key in params) {
            if (key && key !== 'orgunit-select') {
                const index = dataset.dimensions.findIndex(item => item.name === key);

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
                for (const dim in params[key]) {
                    const index = dataset.dimensions.findIndex(item => item.name === dim);

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
