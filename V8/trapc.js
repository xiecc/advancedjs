function Point(n, x, y) {
    this.n = n;
    this.x = x;
    this.y = y;
}

function sumArrayOfPoints(points) {
    var sum = new Point(0, 0, 0);

    for (var i = 0; i < points.length; i++) {
        if ((points[i].n & 1) === 0) {
            sum.x += points[i].x;
            sum.y += points[i].y;
        }
    }

    return sum;
}

function createArrayOfPoints(n) {
    var points = new Array(n);
    for (var i = 0; i < n; i++) {
        points[i] = new Point(/* n */ i, /* x */ i * 0.1 + 0.1, /* y */ i * 0.9 - 0.1);
    }
    return points;
}

function now() {
    return Date.now() * 1000;
}

function assertStrictlyEqual(expected, value) {
  if (expected !== value) {
    throw new Error("Assertion failed: expected " + expected + " got " + value);
  }
}

function testArrayOfPoints() {
    var kArraySize = 10000;
    var kIterations = 10000;

    var createTotal = 0;
    var sumTotal = 0;

    for (var i = 0; i < kIterations; i++) {
        var t1 = now();
        var array = createArrayOfPoints(kArraySize);
        var t2 = now();
        var sum = sumArrayOfPoints(array);
        var t3 = now();
        assertStrictlyEqual(2500000, sum.x | 0);
        assertStrictlyEqual(22495000, sum.y | 0);
        assertStrictlyEqual(0, sum.n);

        createTotal += (t2 - t1);
        sumTotal += (t3 - t2);
    }

    console.log("create: " + createTotal + " [" + (createTotal / kIterations) + " per iteration] usec," +
                " sum: " + sumTotal + " [" + (sumTotal / kIterations) + " per iteration] usec\n");
}

testArrayOfPoints();
