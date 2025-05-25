import { Injectable } from '@nestjs/common';

@Injectable()
export class SharedService {
  /**
   * 构造树型结构数据，去除空 children 字段
   */
  public handleTree(data: any[], idKey = 'id', parentKey = 'parentId') {
    const nodeMap = new Map<number, any>();
    const tree: any[] = [];

    // 首先把每个节点根据 id 存入 Map 中
    data.forEach(item => {
      // 提取 meta 信息
      const {
        icon,
        title,
        isHide,
        isFull,
        isAffix,
        isKeepAlive,
        ...rest
      } = item;

      const node = {
        ...rest,
        meta: {
          icon,
          title,
          isHide,
          isFull,
          isAffix,
          isKeepAlive,
        },
      };

      nodeMap.set(item[idKey], node);
    });

    // 构造树结构
    for (const [id, node] of nodeMap) {
      const parentId = node[parentKey];
      const parentNode = nodeMap.get(parentId);
      if (parentNode) {
        if (!parentNode.children) parentNode.children = [];
        parentNode.children.push(node);
      } else {
        tree.push(node);
      }
    }

    // 移除空 children 字段
    const removeEmptyChildren = (nodes: any[]) => {
      nodes.forEach(node => {
        if (node.children) {
          removeEmptyChildren(node.children);
          if (node.children.length === 0) {
            delete node.children;
          }
        }
      });
    };
    removeEmptyChildren(tree);

    return tree;
  }
}
