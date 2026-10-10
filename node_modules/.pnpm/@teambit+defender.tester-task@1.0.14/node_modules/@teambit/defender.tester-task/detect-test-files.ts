import { Component } from '@teambit/component';
import { DevFilesMain } from '@teambit/dev-files';
import { TesterAspect } from '@teambit/tester';

// better not to import this from "teambit.component/sources", it's only used for the type here.
type AbstractVinyl = { path: string; relative: string };

/**
 * detect test files in components
 */
export function detectTestFiles(component: Component, devFiles: DevFilesMain): AbstractVinyl[] {
  const files = devFiles.getDevFiles(component);
  const testFiles = files.get(TesterAspect.id);
  return component.state.filesystem.files.filter((file) =>
    testFiles.includes(file.relative)
  );
}
