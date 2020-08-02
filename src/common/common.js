function getInputSizeClassName(size) {
    if (size === "small")
        return "form-control-sm";

    else if (size === "big")
        return "form-control-lg";

    return "";
}

function getInputGroupSizeClassName(size) {
    if (size === "small")
        return "input-group-sm";

    else if (size === "big")
        return "input-group-lg";

    return "";
}

function getSizeClassName(sizes) {
    let className = '';

    if (!sizes)
        return null;

    if (sizes.sm)
        className += "col-sm-" + sizes.sm + " ";

    if (sizes.smOffset)
        className += "col-sm-offset-" + sizes.smOffset + " ";

    if (sizes.md)
        className += "col-md-" + sizes.md + " ";

    if (sizes.mdOffset)
        className += "col-md-offset-" + sizes.mdOffset + " ";

    if (sizes.lg)
        className += "col-lg-" + sizes.lg + " ";

    if (sizes.lgOffset)
        className += "col-lg-offset-" + sizes.lgOffset + " ";

    if (sizes.xl)
        className += "col-xl-" + sizes.xl + " ";

    if (sizes.xlOffset)
        className += "col-xl-offset-" + sizes.xlOffset + " ";

    return className;
}

function getType(type) {
    if (type === 'string')
        return "text";

    if (type === 'number' || type === 'percent')
        return "number";

    if (type === 'date')
        return "date";

    if (type === 'datetime')
        return "datetime-local";

    return "text";
}

function onKeyPress(event) {
    // 13 is the "Enter" key.
    if (event.which === 13 || event.key === 13) {
        const nodes = document.querySelectorAll('input.form-control,select,textarea');

        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];

            if (node.isSameNode(event.target)) {
                if (i < (nodes.length - 1))
                    nodes[i + 1].focus();

                else
                    nodes[0].focus();

                break;
            }
        }
    }
}

export {getInputSizeClassName, getInputGroupSizeClassName, getSizeClassName, getType, onKeyPress}