import { Request, Response } from 'express';
import { Controller, Get, Param, Req, Res } from '@nestjs/common';
import { NewspaperService } from './newspaper.service';
import { SectionDto } from './dto/newspaper.dto';
import * as RSS from 'rss';

@Controller('newspaper')
export class NewspaperController {
  constructor(private readonly newspaperService: NewspaperService) {}

  @Get(':sectionName')
  async getSectionData(
    @Req() req: Request,
    @Res() res: Response,
    @Param() params: SectionDto
  ) {
    const results = await this.newspaperService.getSectionData(params.sectionName);

    /**
     * For more details, see
     * https://www.npmjs.com/package/rss
     */

    const feed = new RSS({
      title: `Guardian ${params.sectionName} RSS Feed`,
      description: `Latest articles from The Guardian - ${params.sectionName}`,
      feed_url: req.protocol + '://' + req.get('host') + req.originalUrl,
      site_url: `https://www.theguardian.com/${params.sectionName}`,
    });

    results.forEach((item) => {
      feed.item({
        title: item.webTitle,
        description: item.webTitle,
        url: item.webUrl,
        date: item.webPublicationDate,
      });
    });

    // Set the response content type to application/rss+xml
    res.contentType('application/rss+xml');

    // Send the generated RSS feed as the response
    res.send(feed.xml());
  }
}
