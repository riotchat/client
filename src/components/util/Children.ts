export function killChildren(props: any) {
    let propsWithoutChild = Object.assign({}, props);
    delete propsWithoutChild.children;
    return propsWithoutChild;
}