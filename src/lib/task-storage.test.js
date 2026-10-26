import { test, expect } from 'bun:test';
import { recoverTasks } from './task-storage';
test('null and malformed entries cannot destroy valid saved tasks',()=>{
 const raw=JSON.stringify([{id:'a',title:'Keep me',done:true,createdAt:10},null,42,{title:12}]);
 const result=recoverTasks(raw,()=> 'generated');
 expect(result.tasks).toEqual([{id:'a',title:'Keep me',done:true,createdAt:10}]);expect(result.recovered).toBe(true);
});
test('duplicate identifiers are repaired, text remains plain data and failed hydration throws',()=>{
 const result=recoverTasks(JSON.stringify([{id:'same',title:'<script>plain text</script>'},{id:'same',title:'B'}]),()=> 'unique');
 expect(result.tasks.map(t=>t.id)).toEqual(['same','unique']);expect(result.tasks[0].title).toBe('<script>plain text</script>');
 expect(()=>recoverTasks('{',()=> 'id')).toThrow();expect(()=>recoverTasks('{}',()=> 'id')).toThrow();
});
