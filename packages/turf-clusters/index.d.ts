import { FeatureCollection } from '@turf/helpers';
/**
 * Get Cluster
 *
 * @name getCluster
 * @param {FeatureCollection} geojson GeoJSON Features
 * @param {*} filter Filter used on GeoJSON properties to get Cluster
 * @returns {FeatureCollection} Single Cluster filtered by GeoJSON Properties
 * @example
 * var geojson = turf.featureCollection([
 *     turf.point([0, 0], {'marker-symbol': 'circle'}),
 *     turf.point([2, 4], {'marker-symbol': 'star'}),
 *     turf.point([3, 6], {'marker-symbol': 'star'}),
 *     turf.point([5, 1], {'marker-symbol': 'square'}),
 *     turf.point([4, 2], {'marker-symbol': 'circle'})
 * ]);
 *
 * // Create a cluster using K-Means (adds `cluster` to GeoJSON properties)
 * var clustered = turf.clustersKmeans(geojson);
 *
 * // Retrieve first cluster (0)
 * var cluster = turf.getCluster(clustered, {cluster: 0});
 * //= cluster
 *
 * // Retrieve cluster based on custom properties
 * turf.getCluster(clustered, {'marker-symbol': 'circle'}).length;
 * //= 2
 * turf.getCluster(clustered, {'marker-symbol': 'square'}).length;
 * //= 1
 */
export declare function getCluster<G extends any, P = any>(geojson: FeatureCollection<G, P>, filter: any): FeatureCollection<G, P>;
/**
 * Callback for clusterEach
 *
 * @callback clusterEachCallback
 * @param {FeatureCollection} [cluster] The current cluster being processed.
 * @param {*} [clusterValue] Value used to create cluster being processed.
 * @param {number} [currentIndex] The index of the current element being processed in the array.Starts at index 0
 * @returns {void}
 */
/**
 * clusterEach
 *
 * @name clusterEach
 * @param {FeatureCollection} geojson GeoJSON Features
 * @param {string|number} property GeoJSON property key/value used to create clusters
 * @param {Function} callback a method that takes (cluster, clusterValue, currentIndex)
 * @returns {void}
 * @example
 * var geojson = turf.featureCollection([
 *     turf.point([0, 0]),
 *     turf.point([2, 4]),
 *     turf.point([3, 6]),
 *     turf.point([5, 1]),
 *     turf.point([4, 2])
 * ]);
 *
 * // Create a cluster using K-Means (adds `cluster` to GeoJSON properties)
 * var clustered = turf.clustersKmeans(geojson);
 *
 * // Iterate over each cluster
 * turf.clusterEach(clustered, 'cluster', function (cluster, clusterValue, currentIndex) {
 *     //= cluster
 *     //= clusterValue
 *     //= currentIndex
 * })
 *
 * // Calculate the total number of clusters
 * var total = 0
 * turf.clusterEach(clustered, 'cluster', function () {
 *     total++;
 * });
 *
 * // Create an Array of all the values retrieved from the 'cluster' property
 * var values = []
 * turf.clusterEach(clustered, 'cluster', function (cluster, clusterValue) {
 *     values.push(clusterValue);
 * });
 */
export declare function clusterEach<G = any, P = any>(geojson: FeatureCollection<G, P>, property: number | string, callback: (cluster?: FeatureCollection<G, P>, clusterValue?: any, currentIndex?: number) => void): void;
/**
 * Callback for clusterReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback clusterReduceCallback
 * @param {*} [previousValue] The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {FeatureCollection} [cluster] The current cluster being processed.
 * @param {*} [clusterValue] Value used to create cluster being processed.
 * @param {number} [currentIndex] The index of the current element being processed in the
 * array. Starts at index 0, if an initialValue is provided, and at index 1 otherwise.
 */
/**
 * Reduce clusters in GeoJSON Features, similar to Array.reduce()
 *
 * @name clusterReduce
 * @param {FeatureCollection} geojson GeoJSON Features
 * @param {string|number} property GeoJSON property key/value used to create clusters
 * @param {Function} callback a method that takes (previousValue, cluster, clusterValue, currentIndex)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @returns {*} The value that results from the reduction.
 * @example
 * var geojson = turf.featureCollection([
 *     turf.point([0, 0]),
 *     turf.point([2, 4]),
 *     turf.point([3, 6]),
 *     turf.point([5, 1]),
 *     turf.point([4, 2])
 * ]);
 *
 * // Create a cluster using K-Means (adds `cluster` to GeoJSON properties)
 * var clustered = turf.clustersKmeans(geojson);
 *
 * // Iterate over each cluster and perform a calculation
 * var initialValue = 0
 * turf.clusterReduce(clustered, 'cluster', function (previousValue, cluster, clusterValue, currentIndex) {
 *     //=previousValue
 *     //=cluster
 *     //=clusterValue
 *     //=currentIndex
 *     return previousValue++;
 * }, initialValue);
 *
 * // Calculate the total number of clusters
 * var total = turf.clusterReduce(clustered, 'cluster', function (previousValue) {
 *     return previousValue++;
 * }, 0);
 *
 * // Create an Array of all the values retrieved from the 'cluster' property
 * var values = turf.clusterReduce(clustered, 'cluster', function (previousValue, cluster, clusterValue) {
 *     return previousValue.concat(clusterValue);
 * }, []);
 */
export declare function clusterReduce<G = any, P = any>(geojson: FeatureCollection<G, P>, property: number | string, callback: (previousValue?: any, cluster?: FeatureCollection<G, P>, clusterValue?: any, currentIndex?: number) => void, initialValue?: any): void;
/**
 * Create Bins
 *
 * @private
 * @param {FeatureCollection} geojson GeoJSON Features
 * @param {string|number} property Property values are used to create bins
 * @returns {Object} bins with Feature IDs
 * @example
 * var geojson = turf.featureCollection([
 *     turf.point([0, 0], {cluster: 0, foo: 'null'}),
 *     turf.point([2, 4], {cluster: 1, foo: 'bar'}),
 *     turf.point([5, 1], {0: 'foo'}),
 *     turf.point([3, 6], {cluster: 1}),
 * ]);
 * createBins(geojson, 'cluster');
 * //= { '0': [ 0 ], '1': [ 1, 3 ] }
 */
export declare function createBins(geojson: FeatureCollection<any>, property: string | number): {};
/**
 * Apply Filter
 *
 * @private
 * @param {*} properties Properties
 * @param {*} filter Filter
 * @returns {boolean} applied Filter to properties
 */
export declare function applyFilter(properties: any, filter: any): any;
/**
 * Properties contains filter (does not apply deepEqual operations)
 *
 * @private
 * @param {*} properties Properties
 * @param {Object} filter Filter
 * @returns {boolean} does filter equal Properties
 * @example
 * propertiesContainsFilter({foo: 'bar', cluster: 0}, {cluster: 0})
 * //= true
 * propertiesContainsFilter({foo: 'bar', cluster: 0}, {cluster: 1})
 * //= false
 */
export declare function propertiesContainsFilter(properties: any, filter: any): boolean;
/**
 * Filter Properties
 *
 * @private
 * @param {*} properties Properties
 * @param {Array<string>} keys Used to filter Properties
 * @returns {*} filtered Properties
 * @example
 * filterProperties({foo: 'bar', cluster: 0}, ['cluster'])
 * //= {cluster: 0}
 */
export declare function filterProperties(properties: any, keys: string[]): any;
