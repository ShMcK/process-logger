import test from 'ava';
import assignTypes from '../lib/assign-types';

test('assigns string', t => {
	const input = ['This is a string'];
	const expected = [JSON.stringify({
		type: 'string',
		output: 'This is a string'
	})];
	t.deepEqual(assignTypes(input), expected);
});

test('assigns number', t => {
	const input = [12];
	const expected = [JSON.stringify({
		type: 'number',
		output: '12'
	})];
	t.deepEqual(assignTypes(input), expected);
});

test('assigns object', t => {
	const input = [{
		a: 1,
		b: 2
	}];
	const expected = [JSON.stringify({
		type: 'object',
		output: '{ a: 1, b: 2 }'
	})];
	t.deepEqual(assignTypes(input), expected);
});

test('assigns array', t => {
	const input = [
		[1, 2, 3]
	];
	const expected = [JSON.stringify({
		type: 'array',
		output: '[ 1, 2, 3 ]'
	})];
	t.deepEqual(assignTypes(input), expected);
});

test('assigns date', t => {
	var date = new Date();
	const input = [date];
	const expected = [JSON.stringify({
		type: 'date',
		output: date.toString()
	})];
	t.deepEqual(assignTypes(input), expected);
});

test('assigns boolean', t => {
	const input = [true];
	const expected = [JSON.stringify({
		type: 'boolean',
		output: 'true'
	})];
	t.deepEqual(assignTypes(input), expected);
});

test('assigns undefined', t => {
	const input = [undefined];
	const expected = [JSON.stringify({
		type: 'undefined',
		output: 'undefined'
	})];
	t.deepEqual(assignTypes(input), expected);
});

test('assigns null', t => {
	const input = [null];
	const expected = [JSON.stringify({
		type: 'null',
		output: 'null'
	})];
	t.deepEqual(assignTypes(input), expected);
});

test('assigns NaN', t => {
	const input = [NaN];
	const expected = [JSON.stringify({
		type: 'NaN',
		output: 'NaN'
	})];
	t.deepEqual(assignTypes(input).type, expected.type);
});

test('multiple strings', t => {
	const expected = [JSON.stringify({
		type: 'string',
		output: 'This is a string'
	}, {
		type: 'string',
		output: 'Another string'
	})];
	t.deepEqual(assignTypes(['This is a string'], ['Another string']), expected);
});

test('multiple numbers', t => {
	const expected = [JSON.stringify({
		type: 'number',
		output: 1
	}, {
		type: 'number',
		output: 2
	})];
	t.deepEqual(assignTypes([1], [2]), expected);
});

test('large objects', t => {
	const input = {
		a: {
			b: {
				c: {
					d: 2
				}
			}
		}
	};
	const expected = [JSON.stringify({
		type: 'object',
		output: '{ a: { b: { c: { d: 2 } } } }'
	})];
	t.deepEqual(assignTypes([input]), expected);
});

test('nested arrays', t => {
	const input = [1, [2, [3, [4, [5]]]]];
	const expected = [JSON.stringify({
		type: 'array',
		output: '[ 1, [ 2, [ 3, [ 4, [ 5 ] ] ] ] ]'
	})];
	t.deepEqual(assignTypes([input]), expected);
})
