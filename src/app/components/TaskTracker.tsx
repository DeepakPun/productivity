"use client";

import { useState, useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "@hello-pangea/dnd";

type Priority = "high" | "medium" | "low";

interface TaskItem {
  id: string;
  text: string;
  completed: boolean;
  priority: Priority;
}

const DEFAULT_TASKS: TaskItem[] = [];

const COLUMNS: {
  id: Priority;
  title: string;
  dot: string;
  header: string;
  border: string;
  badge: string;
}[] = [
  {
    id: "high",
    title: "High Priority",
    dot: "bg-red-500",
    header: "text-red-400",
    border: "border-red-900/40",
    badge: "bg-red-950/30 border-red-900/50 text-red-400",
  },
  {
    id: "medium",
    title: "Medium Priority",
    dot: "bg-amber-500",
    header: "text-amber-400",
    border: "border-amber-900/40",
    badge: "bg-amber-950/30 border-amber-900/50 text-amber-500",
  },
  {
    id: "low",
    title: "Low Priority",
    dot: "bg-slate-500",
    header: "text-slate-400",
    border: "border-slate-800",
    badge: "bg-slate-900 border-slate-800 text-slate-500",
  },
];

export default function TaskTracker() {
  // hydration fix: start empty on server, hydrate from localStorage after mount
  const [tasks, setTasks] = useState<TaskItem[]>(DEFAULT_TASKS);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // defer setState into a callback — not sync in effect body
    const id = requestAnimationFrame(() => {
      setIsMounted(true);

      const cached = localStorage.getItem("devhq_tasks_pool");
      if (!cached) return;
      try {
        const parsed = JSON.parse(cached) as TaskItem[];
        setTasks(
          parsed.map((t) => ({
            ...t,
            priority: t.priority || ("medium" as Priority),
          })),
        );
      } catch {}
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const saveAndSyncTasks = (nextTasks: TaskItem[]) => {
    setTasks(nextTasks);
    localStorage.setItem("devhq_tasks_pool", JSON.stringify(nextTasks));
  };

  const handleAddTask = (formData: FormData) => {
    const text = formData.get("taskText") as string;
    const priority = (formData.get("priority") as Priority) || "medium";
    if (!text || !text.trim()) return;
    saveAndSyncTasks([
      ...tasks,
      {
        id: `task-${crypto.randomUUID()}`,
        text: text.trim(),
        completed: false,
        priority,
      },
    ]);
  };

  const handleToggleTask = (idToToggle: string) => {
    saveAndSyncTasks(
      tasks.map((task) =>
        task.id === idToToggle ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const handleDeleteTask = (idToKill: string) => {
    saveAndSyncTasks(tasks.filter((task) => task.id !== idToKill));
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const sourcePriority = source.droppableId as Priority;
    const destPriority = destination.droppableId as Priority;

    // tasks in source column in render order
    const sourceTasks = tasks.filter((t) => t.priority === sourcePriority);
    const [moved] = sourceTasks.splice(source.index, 1);

    if (sourcePriority === destPriority) {
      // reorder within same column
      sourceTasks.splice(destination.index, 0, moved);
      const otherTasks = tasks.filter((t) => t.priority !== sourcePriority);
      // keep original order: rebuild by merging
      // simplest: keep global order but place reordered column tasks back in same spot logic:
      // rebuild tasks array: remove all source column, then re-insert in order at first occurrence
      saveAndSyncTasks([...otherTasks, ...sourceTasks]);
    } else {
      // move to other column -> change priority
      const updated = { ...moved, priority: destPriority };
      const withoutMoved = tasks.filter((t) => t.id !== moved.id);
      // insert at destination index inside dest column
      const destTasks = withoutMoved.filter((t) => t.priority === destPriority);
      destTasks.splice(destination.index, 0, updated);
      const otherTasks = withoutMoved.filter(
        (t) => t.priority !== destPriority,
      );
      saveAndSyncTasks([...otherTasks, ...destTasks]);
    }
  };

  if (!isMounted) return null; // prevents hydration mismatch + dnd SSR error

  return (
    <div className="space-y-6">
      <header className="mb-2">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2 uppercase tracking-widest">
          <span>System Matrix</span> {" // "} <span>Procurement</span>
        </div>
        <h1 className="text-2xl font-black tracking-tight text-slate-100 sm:text-3xl">
          Task Tracker
        </h1>
      </header>

      <form
        action={handleAddTask}
        className="flex flex-col sm:flex-row gap-3 bg-slate-900 border border-slate-800/80 p-4 rounded-xl shadow-lg"
      >
        <input
          type="text"
          name="taskText"
          placeholder="Deploy next system node container..."
          className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-hidden focus:border-indigo-500 grow"
          required
        />
        <select
          name="priority"
          defaultValue="medium"
          className="bg-slate-950 border border-slate-800 rounded-lg px-5 py-2 text-sm text-slate-200 focus:outline-hidden focus:border-indigo-500"
        >
          <option value="high">🔴 High</option>
          <option value="medium">🟡 Medium</option>
          <option value="low">⚪ Low</option>
        </select>
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-500 text-slate-950 font-bold text-xs uppercase tracking-wider px-5 py-2 rounded-lg transition-colors cursor-pointer shrink-0"
        >
          Add Task
        </button>
      </form>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
          {COLUMNS.map((col) => {
            const colTasks = tasks.filter((t) => t.priority === col.id);
            return (
              <Droppable key={col.id} droppableId={col.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`rounded-xl border ${col.border} bg-slate-950/60 overflow-hidden transition-colors ${snapshot.isDraggingOver ? "bg-slate-900/80 ring-1 ring-indigo-500/30" : ""}`}
                  >
                    <div className="flex items-center justify-between px-4 py-3 border-b border-slate-900">
                      <div className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${col.dot}`} />
                        <span
                          className={`text-xs font-black uppercase tracking-widest ${col.header}`}
                        >
                          {col.title}
                        </span>
                      </div>
                      <span className="text- font-mono text-slate-500 border border-slate-800 rounded px-1.5 py-0.5">
                        {colTasks.length}
                      </span>
                    </div>

                    <div className="p-3 space-y-2 min-h-">
                      {colTasks.map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`p-3 flex items-center justify-between gap-3 border border-slate-800/80 rounded-lg shadow-md bg-slate-900/40 ${snapshot.isDragging ? "border-indigo-500/50 shadow-xl scale-[1.02] rotate-1" : ""}`}
                            >
                              <div className="flex items-center gap-3 grow min-w-0">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleToggleTask(task.id);
                                  }}
                                  className={`h-5 w-5 rounded-md border flex items-center justify-center shrink-0 transition-all cursor-pointer ${task.completed ? "bg-indigo-500/20 border-indigo-500 text-indigo-400" : "border-slate-700 hover:border-slate-600 bg-slate-900"}`}
                                >
                                  {task.completed && (
                                    <span className="text-xs font-black">
                                      ✓
                                    </span>
                                  )}
                                </button>
                                <span
                                  title={task.text} // full title on hover
                                  onClick={() => handleToggleTask(task.id)}
                                  className={`text-sm font-medium tracking-wide cursor-pointer select-none grow min-w-0 wrap-break-word leading-snug whitespace-normal ${task.completed ? "line-through text-slate-600" : "text-slate-200"}`}
                                  style={{ overflowWrap: "anywhere" }}
                                >
                                  {task.text}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
                                {/* <span
                                  className={`hidden sm:inline text- font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded border ${task.completed ? "bg-emerald-950/30 border-emerald-900/50 text-emerald-500" : col.badge}`}
                                >
                                  {task.completed ? "Done" : col.id}
                                </span> */}
                                {task.completed ? (
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteTask(task.id)}
                                    className="h-7 w-7 flex items-center justify-center bg-slate-900 hover:bg-red-950/40 border border-slate-800 hover:border-red-900/50 rounded-lg text-slate-500 hover:text-red-400 transition-all cursor-pointer text-xs font-mono"
                                  >
                                    ✕
                                  </button>
                                ) : (
                                  <div className="h-7 w-7" />
                                )}
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                      {colTasks.length === 0 && (
                        <div className="p-6 text-center text-xs text-slate-600 font-mono border border-dashed border-slate-800/80 rounded-lg">
                          Drop {col.id} tasks here
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </Droppable>
            );
          })}
        </div>
      </DragDropContext>

      {tasks.length === 0 && (
        <div className="p-12 text-center text-sm text-slate-500 font-mono border border-dashed border-slate-800 rounded-xl">
          Pipeline clear. No active sprint objectives monitored.
        </div>
      )}
    </div>
  );
}
