import { MainPage } from './components/MainPage'
import { Layout } from './Layout'
import { AboutPage } from './components/AboutPage'
import { DiaryPage } from './components/DiaryPage'
import { EditDiary } from './components/EditDiary'
import { AddDiary } from './components/AddDiary'


import { BrowserRouter, Routes, Route} from 'react-router'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export interface DiaryEntry {
  id: number;
  title: string;
  date: string;
  content: string;
}

const queryClient = new QueryClient();

export function App() {


  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<MainPage/>}></Route>
                <Route path="/Diary" element={<DiaryPage/>}></Route>
                <Route path="/Diary/:id" element={<EditDiary />}></Route>
                <Route path="/about" element={<AboutPage />}></Route>
                <Route path="/Diary/add" element={<AddDiary />}></Route>
            </Route>
        </Routes>
    </BrowserRouter>
    </QueryClientProvider>

  );
}