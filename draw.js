var draw = {
    pixel: function (context, x, y, color) {
        context.fillStyle = color;
        context.fillRect(x, y, 1, 1);
    },
    _segmentByX: function (context, xStart, xEnd, yStart, yEnd, color) {
        var y = yStart;
        var s = (yEnd - yStart) / (xEnd - xStart);
        for (var x = xStart; x <= xEnd; ++x) {
            draw.pixel(context, x, Math.round(y), color);
            y += s;
        }
    },
    _segmentByY: function (context, xStart, xEnd, yStart, yEnd, color) {
        var x = xStart;
        var s = (xEnd - xStart) / (yEnd - yStart);
        for (var y = yStart; y <= yEnd; ++y) {
            draw.pixel(context, Math.round(x), y, color);
            x += s;
        }
    },
    segment: function (context, x1, y1, x2, y2, color) {
        var dx = x1 - x2;
        var dy = y1 - y2;
        if (Math.abs(dy) < Math.abs(dx)) {
            if (x1 < x2) draw._segmentByX(context, x1, x2, y1, y2, color);
            else         draw._segmentByX(context, x2, x1, y2, y1, color);
        }
        else {
            if (y1 < y2) draw._segmentByY(context, x1, x2, y1, y2, color);
            else         draw._segmentByY(context, x2, x1, y2, y1, color);
        }
    }
};
