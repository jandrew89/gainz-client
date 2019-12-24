export class ListBase {
    rebaseToZero(list: any[]): any[] {
        let needToRebase = list.some(s => s.order == 0);
        
        if (needToRebase) {
            list.forEach(set => {
              set.order = set.order + 1;
            });
          }

        return list.sort((a,b) => a.order - b.order);
    }
}