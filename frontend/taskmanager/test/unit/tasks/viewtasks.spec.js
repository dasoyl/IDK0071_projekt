import {ViewTasks} from '../../../src/tasks/viewtasks';
import {FilterValueConverter} from '../../../src/tasks/viewtasks';

describe('ViewTasks', () => {
  it('invertExpanded true -> false', () => {
    const controller = new ViewTasks();
    const task = {expanded: true};
    
    controller.invertExpanded(task);
    
    expect(task.expanded).toBe(false);
  });

  it('invertExpanded false -> true', () => {
    const controller = new ViewTasks();
    const task = {expanded: false};
    
    controller.invertExpanded(task);
    
    expect(task.expanded).toBe(true);
  });

  it('invertExpanded undefined -> true', () => {
    const controller = new ViewTasks();
    const task = {};
    
    controller.invertExpanded(task);
    
    expect(task.expanded).toBe(true);
  });
});

describe('FilterValueConverter', () => {
    it('toView filters correctly', () => {
      const filter = new FilterValueConverter();
      const tasks = [
          {urgent: true, important: true},
          {urgent: true, important: false},
          {urgent: false, important: true},
          {urgent: false, important: false}
      ];
      
      const filtered = filter.toView(tasks, true, true);
      
      expect(filtered).toEqual([
        {urgent: true, important: true}
      ]);
    });
  });