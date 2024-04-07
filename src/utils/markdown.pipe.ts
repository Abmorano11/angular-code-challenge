import { Pipe, PipeTransform } from '@angular/core';
import { UserData } from 'src/model/user-data';
import { renderMarkdown } from './string';
@Pipe({
  standalone: true,
  name: 'markdown'
})
export class MarkdownPipe implements PipeTransform {
  transform(bio: string): string {
    return renderMarkdown(bio);
  }
}