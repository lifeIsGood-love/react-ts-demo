module.exports = {
	root: true,
	env: {
			browser: true,
			es6: true,
			node: true
	},
	extends: [
			'airbnb',
			'prettier',
			'eslint:recommended',
			'plugin:import/typescript',
			'plugin:react/recommended',
			'prettier/react',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
			ecmaFeatures: {
					jsx: true
			},
			ecmaVersion: 2018,
			sourceType: 'module'
	},
	plugins: ['react', 'babel', '@typescript-eslint', 'react-hooks'],
	rules: {
			'no-var': 0,
			'func-names': 0, // 函数表达式必须有名字
			'class-methods-use-this': 0, // 强制类方法使用 this
			'array-callback-return': 0, // 强制数组方法的回调函数中有 return 语句
			'no-empty': ['error', { allowEmptyCatch: true }], // 禁止空块语句,允许出现空的 catch 子句
			'import/extensions': 0,
			'import/no-unresolved': 0,
      'import/prefer-default-export': 0, //当模块只输出一个变量时，是否需要添加default
      'import/no-extraneous-dependencies': 0,
			'prefer-template': 0,
			'prefer-const': 0,
			'prefer-destructuring': 0, // 解构
			'no-param-reassign': 0, // 不允许对 function 的参数进行重新赋值
			'no-return-await': 1, // return await promise, 后续改进
			'no-plusplus': 0,
			'no-console': ['error', { allow: ['log', 'warn', 'error'] }],
			'no-else-return': ['error', { allowElseIf: true }], // 禁止在 else 前有 return, else if 可以有, else 不可以
			'no-unused-expressions': [
					'error',
					{
							allowShortCircuit: true,
							allowTernary: true,
							allowTaggedTemplates: true
					}
			], // 禁止未使用过的表达式
			'no-underscore-dangle': 0,
			'react/jsx-one-expression-per-line': 0,
			'react/prop-types': 0,
			'react/jsx-no-bind': 0,
			'react/sort-comp': 0,
			'react/no-string-refs': 0,
			'react/no-array-index-key': 0,
			'react/jsx-fragments': 0, // React.Fragment采用简写方式<></>
			'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
			'react/destructuring-assignment': 0,
			'jsx-a11y/no-static-element-interactions': 0,
			'jsx-a11y/anchor-has-content': 0,
			'jsx-a11y/click-events-have-key-events': 0,
			'jsx-a11y/anchor-is-valid': 0,
      'jsx-a11y/href-no-hash': 0,
      // https://github.com/typescript-eslint/typescript-eslint/issues/2540#issuecomment-692866111
      'no-use-before-define': 0,
	}
};
