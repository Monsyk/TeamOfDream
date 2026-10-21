'use strict';
globalThis.EcoCart = Object.freeze({
  printPrice: 50,
  calculate(products, selection, prints) {
    const catalogue = new Map(products.map(p => [p.id,p]));
    const rows = [];
    let total = 0, count = 0;
    for (const [id,rawQty] of selection) {
      const product = catalogue.get(id);
      const qty = Math.min(99,Math.max(0,Math.floor(Number(rawQty) || 0)));
      if (!product || !qty) continue;
      const printed = Boolean(product.eligible && !product.included && prints.has(id));
      const printSubtotal = printed ? qty * 50 : 0;
      const lineTotal = product.price * qty + printSubtotal;
      rows.push({product,qty,printed,printSubtotal,lineTotal});
      count += qty; total += lineTotal;
    }
    return {rows,total,count};
  }
});
