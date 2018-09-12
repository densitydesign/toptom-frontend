import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import riot from 'rollup-plugin-riot';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';

export default {
	context: 'window',
	entry: 'index.js',
	plugins: [
		riot(),
		replace({
			'process.env.NODE_ENV': JSON.stringify('production')
		}),
		resolve({
			preferBuiltins: false
		}),
		commonjs({
			namedExports: {
				'node_modules/redux-logger/dist/redux-logger.js': ['createLogger']
			}
		}),
		globals(),
		builtins()
	],
	targets: [
		{dest: 'dist/bundle.es.js', format: 'es'}
	],
	sourceMap: true
};
