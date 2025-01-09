function sum(params) {
return 1+2;
}


test('1 +2 should be 3', () => { 
    expect(sum()).toBe(3);
 })