import Component from '../react/component';

const ReactDOM = {
  render
}

function render(vnode, container) {
  return container.appendChild(_render(vnode));
}

// 创建组件
function createComponent(comp, props) {
  let inst;
  if (comp.prototype && comp.prototype.render) {
    // 如果是个类组件 创建实例 返回
    inst = new comp(props);
  } else {
    // 如果是函数组件
    inst = new Component(props);
    inst.constructor = comp;
    // 定义render 函数
    inst.render = function () {
      return this.constructor(props)
    }
  }
  return inst;
}

function renderComponent(comp) {
  let base;
  const _vnode = comp.render();
  comp.base = _render(_vnode);
}

// 设置组件属性
function setComponentProps(comp, props) {
  // 设置属性
  comp.props = props;
  // 渲染组件
  renderComponent(comp);
}

function _render(vnode) {
  if (vnode === undefined || vnode === null || typeof vnode === 'boolean') vnode = '';
  // 如果vnoe是字符串
  if (typeof vnode === 'string') {
    // 创建文本节点
    return document.createTextNode(vnode);
  }
  const { tag, attrs } = vnode;
  if (typeof vnode.tag === 'function') {
    // 1.创建组件
    const comp = createComponent(tag, attrs);
    console.log('====================================');
    console.log(comp);
    console.log('====================================');
    // 2.设置组件属性
    setComponentProps(comp, attrs);
    // 3.组件渲染的子节点返回
    return comp.base;
  }

  // 否则就是虚拟DOM对象
  const dom = document.createElement(tag);
  if (attrs) {
    Object.keys(attrs).forEach(key => {
      const value = attrs[key];
      setAttribute(dom, key, value);
    })
  }
  // 递归渲染子节点
  if (vnode.childrens) {
    vnode.childrens.forEach(child => render(child, dom));
  }
  return dom;
}

// 设置属性
function setAttribute(dom, key, value) {
  // 将属性名className转换成class
  if (key === 'className') {
    key = 'class';
  }
  // 如果是事件  onClick onBlur...
  if (/on\w+/.test(key)) {
    key.toLowerCase();
    dom[key] = value || '';
  } else if (key === 'style') {
    if (!value || typeof value === 'string') {
      dom.style.cssText = value || '';
    } else if (value && typeof value === 'object') {
      // {width:200}
      for (let k in value) {
        if (typeof value[k] === 'number') {
          dom.style[k] = value[k] + 'px';
        } else {
          dom.style[k] = value[k];
        }
      }
    }
  } else {
    // 其他属性
    if (key in dom) {
      dom[key] = value || '';
    }
    if (value) {
      // 更新
      dom.setAttribute(key, value);
    } else {
      dom.removeAttribute(key);
    }
  }
}

export default ReactDOM