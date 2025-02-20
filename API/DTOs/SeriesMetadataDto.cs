﻿using System.Collections.Generic;
using API.DTOs.CollectionTags;
using API.DTOs.Metadata;
using API.Entities.Enums;

namespace API.DTOs
{
    public class SeriesMetadataDto
    {
        public int Id { get; set; }
        public string Summary { get; set; }
        /// <summary>
        /// Collections the Series belongs to
        /// </summary>
        public ICollection<CollectionTagDto> CollectionTags { get; set; }
        /// <summary>
        /// Genres for the Series
        /// </summary>
        public ICollection<GenreTagDto> Genres { get; set; }
        /// <summary>
        /// Collection of all Tags from underlying chapters for a Series
        /// </summary>
        public ICollection<TagDto> Tags { get; set; }
        public ICollection<PersonDto> Writers { get; set; } = new List<PersonDto>();
        public ICollection<PersonDto> CoverArtists { get; set; } = new List<PersonDto>();
        public ICollection<PersonDto> Publishers { get; set; } = new List<PersonDto>();
        public ICollection<PersonDto> Characters { get; set; } = new List<PersonDto>();
        public ICollection<PersonDto> Pencillers { get; set; } = new List<PersonDto>();
        public ICollection<PersonDto> Inkers { get; set; } = new List<PersonDto>();
        public ICollection<PersonDto> Colorists { get; set; } = new List<PersonDto>();
        public ICollection<PersonDto> Letterers { get; set; } = new List<PersonDto>();
        public ICollection<PersonDto> Editors { get; set; } = new List<PersonDto>();
        public ICollection<PersonDto> Translators { get; set; } = new List<PersonDto>();
        /// <summary>
        /// Highest Age Rating from all Chapters
        /// </summary>
        public AgeRating AgeRating { get; set; } = AgeRating.Unknown;
        /// <summary>
        /// Earliest Year from all chapters
        /// </summary>
        public int ReleaseYear { get; set; }
        /// <summary>
        /// Language of the content (BCP-47 code)
        /// </summary>
        public string Language { get; set; } = string.Empty;
        /// <summary>
        /// Number in the TotalCount of issues
        /// </summary>
        public int Count { get; set; }
        /// <summary>
        /// Total number of issues for the series
        /// </summary>
        public int TotalCount { get; set; }
        /// <summary>
        /// Publication status of the Series
        /// </summary>
        public PublicationStatus PublicationStatus { get; set; }

        public int SeriesId { get; set; }
    }
}
