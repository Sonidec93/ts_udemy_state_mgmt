import {ListenerFn} from '../types/listener';

export class State<T>{
    protected listeners: ListenerFn<T>[] = [];
  }