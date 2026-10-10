import { UserConfig as ViteConfig } from 'vite';
export declare class VitestWorker {
    private onTestCompleteCb;
    onTestComplete(onTestComplete: ((files: any, errors: any) => void) | undefined): void;
    watch(viteConfig: ViteConfig): Promise<void>;
}
