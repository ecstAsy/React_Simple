import Component from './component';

function createElement(tag, attrs, ...childrens) {
  return {
    tag,
    attrs,
    childrens
  }
}

export default {
  createElement,
  Component
}